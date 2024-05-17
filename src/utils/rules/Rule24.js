import { GenericRule } from '../GenericRule';
import React from 'react';

const MIN_MINUTE = 3;
const MAX_MINUTE = 36;

export class Rule24 extends GenericRule {
    static instance = new Rule24();

    constructor() {
        super();
        this.number = 24;
        this.minute = Math.floor(Math.random() * (MAX_MINUTE - MIN_MINUTE + 1)) + MIN_MINUTE;
        this.second = Math.floor(Math.random() * 60);

        this.desc = `Your password must include the URL of a ${this.minute} minute ${this.second} sec long YouTube video.`;
        this.state = {
            vidEmbed: "",
        }
    }

    getClass() {
        return Rule24;
    }

    async fetchVideoDuration(id) {
        try {
            const res = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/videoLength?vid=${id}`);
            if (!res.ok) {
                throw Error(res.statusText);
            }
            const data = await res.json();
            return data.duration;
        } catch (err) {
            console.error(`There was an error with videoLength: ${err}`);
        }
    }

    async getEmbed(id) {
        return await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/videoEmbed?id=${id}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                return data.html;
            }).catch(err => {
                console.log(err);
                return "";
            });
    }

    async checkRule() {
        return new Promise(async (resolve, reject) => {
            const foundId = findYTIdInText(this.textController.clearText);

            if (this.vidId && this.vidId === foundId) {
                resolve();
                return;
            }

            this.vidId = foundId;

            if (foundId) {
                try {
                    const embed = await this.getEmbed(this.vidId);
                    const rawDuration = await this.fetchVideoDuration(this.vidId);
                    
                    if (!rawDuration) throw new Error("Unable to fetch duration (maybe the video does not exist?).");
                    
                    const durations = YTDurationToSeconds(rawDuration);
                    this.refreshEmbed(embed);
                    this.getClass().fulfilled = durations[1] === this.minute && (durations[2] === this.second || durations[2] === this.second+1 || durations[2] === this.second-1);
                    resolve();
                } catch (error) {
                    this.getClass().fulfilled = false;
                    reject(error);
                }
            } else {
                this.getClass().fulfilled = false;
                this.refreshEmbed(null);
                resolve();
            }
        });
    }

    render() {
        const vidEmbed = this.getClass().getInstance().state.vidEmbed;

        return (
            vidEmbed &&
            React.createElement('div',
                {
                    id: 'youtube-player-wrapper',
                    dangerouslySetInnerHTML: {
                        __html: vidEmbed
                    }
                }
            )
        )
    }

    refreshEmbed(embed) {
        this.getClass().getInstance().state.vidEmbed = embed;
    }
}

function findYTIdInText(text) {
    let urlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    let urls = text.match(urlRegex);

    return urls?.[0].split("/").at(-1).split("?v=").at(-1) ?? null;
}

function YTDurationToSeconds(duration) {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    match = match.slice(1).map(function (x) {
        if (x != null) {
            return x.replace(/\D/, '');
        }
        return null;
    });

    var hours = (parseInt(match[0]) || 0);
    var minutes = (parseInt(match[1]) || 0);
    var seconds = (parseInt(match[2]) || 0);

    return [hours, minutes, seconds];
}

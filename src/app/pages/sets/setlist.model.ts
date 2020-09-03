import { Injectable } from '@angular/core';
import { Song } from '../songs/song.model';

import { Md5 } from 'ts-md5/dist/md5';

function makeid(length) {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return Md5.hashStr(result);
}

@Injectable()
export class Setlist {
	private _id: string;
	public setlistName: string;
	public songs: Song[];


	constructor(setlistName: string, songs: Song[]) {
		this.setlistName = setlistName;
		this.songs = songs;
		this._id = makeid(16).toString()
	}

	public get id() {
		return this._id;
	}
}
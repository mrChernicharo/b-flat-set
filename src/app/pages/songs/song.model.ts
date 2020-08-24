export class Song {
	public name: string;
	public composer: string;
	public style: string;
	public tempo: number;
	public key: string;

	constructor(name: string, composer: string, style: string, tempo: number, key: string) {
		this.name = name;
		this.composer = composer;
		this.style = style;
		this.tempo = tempo;
		this.key = key;
	}
}



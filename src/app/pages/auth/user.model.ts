export class User {
	constructor(
		public id: string,
		public email: string,
		private _token: string,
		private _tokenExpirationDate: Date,
		public registered: boolean,
		public displayName?: string,
		// public refreshToken?: string,
	) { }

	get token() {
		if (!this._token || new Date() > this._tokenExpirationDate) {
			return null
		}
		return this._token;
	}
}
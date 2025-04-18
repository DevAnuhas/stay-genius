class ForbiddenError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ForbiddenError";
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}

export default ForbiddenError;

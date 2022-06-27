export default class Ticket {
	constructor(private number: number, private office: number) {
		this.number = number;
		this.office = office;
	}
	public assignOffice(office: number): void {
		this.office = office;
	}
	public toJson() {
		return {
			number: this.number,
			office: this.office,
		};
	}
}

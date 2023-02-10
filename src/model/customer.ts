export default class Customer {
    private name: string;
    private cpf: string;
    private birthdate: Date = new Date();

    constructor(name: string, cpf: string, birthdate: Date) {
        this.name = name;
        this.cpf = cpf;
        this.birthdate = birthdate;
    }

    public getName() {
        return this.name;
    }

    public getCpf() {
        return this.cpf;
    }

    public getBirthdate() {
        return this.birthdate;
    }

    public cpfIsValid(): boolean {

        if (this.cpf.length === 11) {
            let cpfWhithouVerificationDigits = "";

            for (let i = 0; i < 9; i++) {
                cpfWhithouVerificationDigits += this.cpf[i];
            }

            let cpfWithTenDigits = this.treatTheCpf(cpfWhithouVerificationDigits);
            let cpfWithElevenDigits = this.treatTheCpf(cpfWithTenDigits);

            return cpfWithElevenDigits === this.cpf;

        } else {
            return false;
        }
    }

    public treatTheCpf(cpf: string) {
        let total = 0;
        let multiplier = cpf.length + 1;

        for (let digit of cpf) {
            total += +digit * multiplier;
            multiplier--;
        }

        let rest = total % 11;
        let digit = rest >= 2 ? 11 - rest : 0;
        cpf += digit;

        return cpf;
    }
}
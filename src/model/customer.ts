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

    public verifyCpf(): boolean {
        if (this.cpf.includes(".") && this.cpf.length === 14) {
            const cpfWithoutVerificationDigits = this.cpf.split("-");
            const arrCpf = cpfWithoutVerificationDigits[0].split(".");
            let cpfWithoutPoints = arrCpf.join("");
            let cpf = cpfWithoutPoints + cpfWithoutVerificationDigits[1]

            let cpfWithTenDigits = this.treatTheCpf(cpfWithoutPoints);
            let cpfWithElevenDigits = this.treatTheCpf(cpfWithTenDigits);

            return cpfWithElevenDigits === cpf;
        } else if (this.cpf.length === 11) {
            let cpfWhithouVerificationDigits = "";

            for (let i = 0; i < 9; i++) {
                cpfWhithouVerificationDigits += this.cpf[i];
            }

            let cpfWithTenDigits = this.treatTheCpf(cpfWhithouVerificationDigits);
            let cpfWithElevenDigits = this.treatTheCpf(cpfWithTenDigits);

            return cpfWithElevenDigits === this.cpf;

        }
    }

    public treatTheCpf(cpf: string) {
        let total = 0;
        let j = cpf.length + 1;

        for (let i of cpf) {
            total += +i * j;
            j--;
        }

        let rest = total % 11;
        let digit = rest >= 2 ? 11 - rest : 0;
        cpf += digit;

        return cpf;
    }
}
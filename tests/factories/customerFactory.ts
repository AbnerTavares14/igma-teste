import { faker } from "@faker-js/faker";
import * as gerador from 'gerador-validador-cpf'
class CustomerFactory {
    public customerGenerate() {
        const name = faker.name.firstName();
        const cpf = gerador.generate();
        const birthdate = faker.date.birthdate({ min: 1950, max: 2016, mode: 'year' });

        return { name, cpf, birthdate: `${birthdate.getFullYear()}/${birthdate.getMonth()}/${birthdate.getDay()}}` };
    }
}

export default new CustomerFactory(); 
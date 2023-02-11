import CustomerService from "../src/services/customerService.js";
import customerRepository from "../src/repositories/customerRepository.js";
import {jest} from "@jest/globals";


describe("unit test suite", () => {
    
    it("On function formatCpf should return string with length 11", () => {
        const cpf1 = CustomerService.formatCpf("111.444.777-35");
        const cpf2 = CustomerService.formatCpf("11144477735");
        expect(cpf1.length).toBe(11);
        expect(cpf2.length).toBe(11);
        expect(cpf1).toEqual(cpf2);
    });

    it("Should call the functions formatCpf, create and findByCpf", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477735"});
        jest.spyOn(customerRepository,"create").mockImplementation(() => {});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return false});
        await CustomerService.create("teste", "11144477735", "2000/02/15");
        expect(CustomerService.formatCpf).toBeCalled();
        expect(customerRepository.create).toBeCalled();
        expect(customerRepository.findByCpf).toBeCalled();
    });

    it("Should call the error conflict when cpf already exist in database", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477735"});
        jest.spyOn(customerRepository,"create").mockImplementation(() => {});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return true});
        const promise = CustomerService.create("teste", "11144477735", "2000/02/15");
        expect(promise).rejects.toMatchObject({message: "O CPF já está cadastrado!"});
    });

    it("Should call the error unprocessable entity when cpf is not valid", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477734"});
        jest.spyOn(customerRepository,"create").mockImplementation(() => {});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return false});
        const promise = CustomerService.create("teste", "11144477734", "2000/02/15");
        expect(promise).rejects.toMatchObject({message: "CPF inválido!"});
    });

    it("Should call function findAll", async () => {
        jest.spyOn(customerRepository, "findAll").mockImplementation(() => {});
        await CustomerService.findAll();
        expect(customerRepository.findAll).toBeCalled();
    });

    it("Should call function formatCpf and findByCpf", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477735"});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return true});
        await CustomerService.getCustomerByCpf("11144477735");
        expect(customerRepository.findByCpf).toBeCalled();
        expect(CustomerService.formatCpf).toBeCalled();
    });

    it("Should call the error not found when cpf is not exist in database", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477735"});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return false});
        const promise = CustomerService.getCustomerByCpf("11144477735");
        expect(promise).rejects.toMatchObject({message: "Cliente não encontrado!"});      
    });

    it("Should call the function delete", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477735"});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return true});
        jest.spyOn(customerRepository, "delete").mockImplementation(() => {});
        await CustomerService.deleteByCpf("11144477735");
        expect(CustomerService.formatCpf).toBeCalled();
        expect(customerRepository.findByCpf).toBeCalled();
        expect(customerRepository.delete).toBeCalled();
    });

    it("Should call the error not found when cpf is not exist in database on function deleteByCpf", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477735"});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return false});
        const promise = CustomerService.deleteByCpf("11144477735");
        expect(promise).rejects.toMatchObject({message: "Cliente não está cadastrado!"});
    });

    it("Should call the function findById", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477735"});
        jest.spyOn(customerRepository, "findById").mockImplementation(() => {return {name:"teste", cpf:"11144477735", birthdate:new Date("2000-01-14T02:00:00.000Z")}});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return false});
        jest.spyOn(customerRepository, "updateCustomer").mockImplementation(() => {});
        await CustomerService.updateCustomerById(1,"teste", "", "2000/01/14");
    });

    it("On update customer should call the error not found when id don't exist in database", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477735"});
        jest.spyOn(customerRepository, "findById").mockImplementation(() => {return false});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return false});
        const promise = CustomerService.updateCustomerById(1,"teste", "11144477735", "2000/01/14");
        expect(promise).rejects.toMatchObject({message:"Cliente não encontrado!"});
    });

    it("On update customer should call the error conflict when cpf already exist in database", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementation(() => {return "11144477735"});
        jest.spyOn(customerRepository, "findById").mockImplementation(() => {return {name:"teste", cpf:"11144477735", birthdate:new Date("2000-01-14T02:00:00.000Z")}});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return true});
        const promise = CustomerService.updateCustomerById(1,"", "11144477735");
        expect(promise).rejects.toMatchObject({message: "CPF já está cadastrado!"});
    }); 

    it("On update customer should call the error unprocessable entity when cpf don't have valid format", async () => {
        jest.spyOn(CustomerService, "formatCpf").mockImplementationOnce(() => {return "111444777/35"});
        jest.spyOn(customerRepository, "findById").mockImplementation(() => {return {name:"teste", cpf:"11144477735", birthdate:new Date("2000-01-14T02:00:00.000Z")}});
        jest.spyOn(customerRepository, "findByCpf").mockImplementation(() => {return false});
        const promise = CustomerService.updateCustomerById(1,"teste", "111444777/35");
        expect(promise).rejects.toMatchObject({message:"CPF inválido!"});
    });

});
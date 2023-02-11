export const swaggerDoc = {
    openapi: "3.0.0",
    info: {
        title: "Api clientes com validação do cpf",
        description: "Essa api tem como objetivo cadastrar clientes com cpfs válidos",
        contact: {
            email: "abnerdasilvatavares@gmail.com"
        },
        version: "1.0.0"
    },
    paths: {
        "/customer": {
            post: {
                summary: "Cadastro de clientes",
                description: "Essa rota é responsável por cadastrar novos clientes",
                tags: ["Clientes"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Customer"
                            },
                            examples: {
                                customer: {
                                    value: {
                                        name: "teste",
                                        cpf: "111.444.777-35",
                                        birthdate: "2000/12/25"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "CREATED"
                    },
                    422: {
                        description: "Unprocessable Entity",
                        content: {
                            "application/json": {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    },
                    409: {
                        description: "Conflict",
                        content: {
                            "application/json": {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            },
            get: {
                summary: "Listagem clientes",
                description: "Busca todos os clientes. Por padrão são exibidos apenas 10 resultados por página",
                tags: ["Clientes"],
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        description: "página",
                        requierd: false
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Customer"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/customer/{cpf}": {
            get: {
                summary: "Busca o cliente pelo CPF",
                description: "Busca o cliente pelo CPF",
                tags: ["Clientes"],
                parameters: [
                    {
                        name: "cpf",
                        description: "cpf do cliente",
                        in: "path",
                        required: true
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    $ref: "#/components/schemas/Customer"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Not Found"
                    }
                }
            },
            delete: {
                summary: "Exclui um cliente da base de dados pelo CPF",
                description: "Exclui um cliente da base de dados pelo CPF",
                tags: ["Clientes"],
                parameters: [
                    {
                        name: "cpf",
                        description: "cpf do cliente",
                        in: "path",
                        required: true
                    }
                ],
                responses: {
                    204: {
                        description: "No content",
                        content: {
                            "application/json": {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Not found",
                        content: {
                            "application/json": {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/customer/{id}": {
            patch: {
                summary: "Atualiza um ou mais campos do cliente",
                description: "Atualiza um ou mais campos do cliente pelo id",
                tags: ["Clientes"],
                parameters: [
                    {
                        name: "id",
                        description: "id do cliente",
                        in: "path",
                        required: true
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Customer"
                            },
                            examples: {
                                customer: {
                                    value: {
                                        name: "teste",
                                        cpf: "111.444.777-35",
                                        birthdate: "2000/12/25"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "OK"
                    },
                    400: {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Not found",
                        content: {
                            "application/json": {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    },
                    409: {
                        description: "Conflict",
                        content: {
                            "application/json": {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    },
                    422: {
                        description: "Unprocessable Entity",
                        content: {
                            "application/json": {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Customer: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    cpf: {
                        type: "string"
                    },
                    birthdate: {
                        type: "string"
                    }
                }
            }
        }
    }
}
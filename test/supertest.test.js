import supertest from "supertest";
import * as chai from "chai";
const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing de entrega-backend-3", () => {

    describe("Testing de pets: ", () => {
        it("Endpoint POST /api/pets debe crear una mascota correctamente", async () => {
            const mascotaCreada = {
                name: "Juana",
                specie: "tortuga",
                birthDate: "2022-03-10"
            }
            const { statusCode, ok, _body } = await requester.post("/api/pets").send(mascotaCreada);
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
            expect(_body.payload).to.have.property("_id");
        })

        it("Al crear una mascota con los datos elementales, la mascota  debe tener adopted = false",
            async () => {
                const nuevaMascota = {
                    name: "Luigi",
                    specie: "canario",
                    birthDate: "2023-01-01"
                };
                const { statusCode, body } = await requester.post("/api/pets").send(nuevaMascota);
                expect(statusCode).to.equal(200);
                expect(body.payload).to.have.property("adopted").that.equals(false);
            })

        it("Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo",
            async () => {
                const { statusCode, body } = await requester.get("/api/pets");
                expect(statusCode).to.equal(200);
                expect(body).to.have.property("payload").that.is.an("array");
            })

        it("Si se desea crear una mascota sin el campo  nombre, el módulo debe responder codigo status 400.",
            async () => {
                const mascotaSinNombre = {
                    specie: "tortuga",
                    birthDate: "2020-05-15"
                }
                const { statusCode } = await requester.post("/api/pets").send(mascotaSinNombre);
                expect(statusCode).to.equal(400);
            })

        it("El método DELETE debe poder borrar la última mascota agregada, ésto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota  con el DELETE, y luego corroborar si la mascota existe con un GET",
            async () => {
                const mascota = {
                    name: "Michi",
                    specie: "gato",
                    birthDate: "2023-02-10"
                }
                //Enviamos la mascota, se borra y vemos si se elimino en DB 
                const { body: { payload: { _id } } } = await requester.post("/api/pets").send(mascota);
                const { statusCode } = await requester.delete(`/api/pets/${_id}`);
                expect(statusCode).to.equal(200);
            })
    })


    // ahora con usuarios
    describe("Testing de users", () => {
        let cookie;

        it("Debe registrar correctamente a un usuario", async () => {
            const nuevoUsuario = {
                first_name: "Ana",
                last_name: "Acosta",
                email: "ana@acosta.com",
                password: "1234"
            }
            const { _body } = await requester.post("/api/sessions/register").send(nuevoUsuario);
            expect(_body.payload).to.be.ok;
        })

        it("Debe loguear correctamente al usuario y recuperar la cookie", async () => {
            const nuevoUsuario = {
                email: "ana@acosta.com",
                password: "1234"
            }
            const resultado = await requester.post("/api/sessions/login").send(nuevoUsuario);
            const cookieResultado = resultado.headers["set-cookie"]["0"];
            expect(cookieResultado).to.be.ok;
            cookie = {
                name: cookieResultado.split("=")["0"],
                value: cookieResultado.split("=")["1"]
            }
            expect(cookie.name).to.be.ok.and.equal("coderCookie");
            expect(cookie.value).to.be.ok;
        })

        it("Debe enviar la cookie que contiene el usuario", async () => {
            const { _body } = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]);
            expect(_body.payload.email).to.be.equal("pedro@sanchez.com");
        })
    }) 


    // con adopciones
    describe("Test de las rutas de Adoption", () => {

        it("Debe registrar correctamente una adopción", async () => {
            const mockMascota = {
                name: "Charlie",
                specie: "conejo",
                birthDate: "2022-04-10",
            };
            const petResponse = await requester.post("/api/pets").send(mockMascota);
            console.log("Pet Response:", petResponse._body);
            const petId = petResponse._body.payload?._id;
            expect(petId).to.not.be.undefined;
            const mockUsuario = {
                first_name: "Luis",
                last_name: "Olmos",
                email: "luis@olmos.com",
                password: "1234",
            };
            const userResponse = await requester.post("/api/sessions/register").send(mockUsuario);
            const userId = userResponse._body.payload;
            expect(userId).to.not.be.undefined;
            const mockAdopcion = {
                uid: userId,
                pid: petId,
                adoptionDate: "2024-11-19",
            };
            const response = await requester.post(`/api/adoptions/${userId}/${petId}`).send(mockAdopcion).timeout(10000);
            expect(response.status).to.equal(200);
            expect(response._body).to.have.property("status", "success");
            expect(response._body).to.have.property("message", "Pet adopted");
        }); 

        it("Debe poder encontrar una adopción correctamente al pasarle su ID", async () => {
            const adopcionId = "6765eb6fdbd1ee751ded5e16";
            const { statusCode } = await requester.get(`/api/adoptions/${adopcionId}`);
            expect(statusCode).to.equal(200);
        }); 

        it("Al obtener a las adopciones con el metodo GET, la respuesta debe tener los campos status y payload. Ademas, payload debe ser de tipo Arreglo.", async () => {
            const { statusCode, _body } = await requester.get("/api/adoptions");
            expect(statusCode).to.equal(200);
            expect(_body).to.have.property("status").that.equals("success");
            expect(_body).to.have.property("payload").that.is.an("array");
        }); 
    });
})




import bcrypt from "bcrypt"

const hashedPassword = await bcrypt.hash('Funval123', 10)

const usersMock = [
    {
        user_id: 1,
        f_name: "Francisco",
        l_name: "Vazquez",
        username: "vazquezF",
        email: "vazquez@example.com",
        password: hashedPassword,
        image: "path/to/image.jpg",
        rol: "admin"
    },
    {
        user_id: 2,
        f_name: "Lorena",
        l_name: "Nuñez",
        username: "nuñezL",
        email: "nuñez@example.com",
        password: hashedPassword,
        image: "path/to/image.jpg",
        rol: "user"
    }
]

export default usersMock;

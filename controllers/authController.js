const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class authController {
    static async login( req, res) {
        res.render('auth/login')
    }

    static async loginPost( req, res) {
        const {email, password} = req.body

        // find user
        const user = await User.findOne({where: {email:email}})

        if(!user) {
            req.flash('message','Usuário não encontrado!')
            res.render('auth/login')
            return
        }

        // check if password match

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
            req.flash('message','Senha incorreta!')
            res.render('auth/login')
            return
        }

        // initialize session
        req.session.userid = user.id

        req.flash('message', 'Autenticação realizada com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })

    }

    static async register( req, res) {
        res.render('auth/register')
    }

    static async registerPost( req, res) {

        const {name, email, password, confirmpassword } = req.body

        // passaword match validation

        if(password != confirmpassword ) {
            req.flash('message','As senhas não conferem, tente novamente!')
            res.render('auth/register')
            return
        }

        // chech if user exists

        const checkIfUserExists = await User.findOne({where: {email:email}})

        if(checkIfUserExists) {
            req.flash('message','O e-mail já está em uso!')
            res.render('auth/register')
            return
        }

        // create password

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        
        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createUser = await User.create(user)

            // initialize session
            req.session.userid = createUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })

        } catch (error) {
            console.log(err)
        }
    }

    static logout (req,res) {
        req.session.destroy()
        res.redirect('/login')
    }
}
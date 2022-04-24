import React, { Component } from "react";
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários'
}

const baseUrl = 'http://localhost:3001/signup'
const initialState = {
    user: {user_name: '', user_email:'', user_password:'', confirmPassword: ''},
    list: []
}

export default class User extends Component{
    state = {...initialState }

    clear(){
        this.setState({user: initialState.user})
    }

    save() {
        const user = this.state.user
        const method = user.user_id ? 'put' : 'post'
        const url = user.user_id ? `${baseUrl}/${user.user_id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                console.log(resp.data)
                this.setState({user: initialState.user, list})
            })
    }

    getUpdatedList(user){
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" 
                                name="user_name" 
                                value={this.state.user.user_name}
                                onChange={e => this.updateField(e)}
                                placeholder="digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" 
                                name="user_email" 
                                value={this.state.user.user_email}
                                onChange={e => this.updateField(e)}
                                placeholder="digite o Email..." />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control" 
                                name="user_password" 
                                value={this.state.user.user_password}
                                onChange={e => this.updateField(e)}
                                placeholder="digite uma senha..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Confirme sua senha:</label>
                            <input type="password" className="form-control" 
                                name="confirmPassword" 
                                value={this.state.user.confirmPassword}
                                onChange={e => this.updateField(e)}
                                placeholder="digite novamente sua senha.." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-lg-end">
                        <button className="btn btn-secondary"
                            onClick={e => this.save(e)}>
                            Registrar
                        </button>

                        <button className="btn btn-primary ml-2"
                            onClick={e=> this.clear(e)}>
                            Cancelar
                        </button>

                    </div>
                </div>
            </div>
        )
    }

    render(){
        console.log(this.state.list)
        return(
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}
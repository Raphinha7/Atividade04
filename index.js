import React, { Component } from "react";
import { View, Text, StyleSheet,Switch} from 'react-native';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            valorSlider: 40,
            status: false,
            pizza: 0,
            pizzas: [
                {key: 1, nome:'Calabresa', valor: 40.00},
                {key: 2, nome:'Peperoni', valor: 50.00},
                {key: 3, nome:'Cachorro-Quente', valor: 100.00},
                {key: 4, nome:'Frango', valor: 90.00},
                {key: 5, nome:'Peito de Peru', valor: 200},
            ]
        };
    };

    render(){

        let pizzasItem = this.state.pizzas.map( (v, k) => {
            return <Picker.Item key={k} value={k} label={v.nome}/> 
          } )

        return(
            <View style={styles.container}>
                <Text style={styles.menu}>Menu Pizza</Text>

                <Picker
                selectedValue={this.state.pizza}
                onValueChange={(itemValue) => this.setState({pizza: itemValue})}>
                {pizzasItem}
                </Picker>

                <Text style={styles.pizzas}>Sua escolha foi: 
                    {this.state.pizzas[this.state.pizza].nome}
                </Text>
                <Text style={styles.pizzas}>Valor R$: 
                    {this.state.pizzas[this.state.pizza].valor.toFixed(2)}
                </Text>

                <Switch
                value={this.state.status}
                onValueChange={(valorSwitch) =>this.setState({status:
                    valorSwitch})}
                    thumbColor= "blue"
                />


                <Text style={{textAlign: 'center', fontSize:35}}>
                {(this.state.status) ? "Ativo" : "Inativo"}
                </Text>

                <Slider
                minimumValue={0}
                maximumValue={100}
                onValueChange={(valorselecionado) => this.setState
                ({valorSlider:valorselecionado})}
                value={this.state.valorSlider}
                minimumTrackTintColor="yellow"
                maximumTrackTintColor="green"
                />

                <Text style={{textAlign: 'center', fontSize:30}}>
                {this.state.valorSlider.toFixed(1)}    
                </Text>
                </View>
        );
    }
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 15,
        },
        menu: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        },
        pizzas: {
            marginTop: 15,
            fontSize: 15,
            textAlign: 'center',
        },
    });

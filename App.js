import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Picker, Slider, Switch } from 'react-native';

const jogosMock = [
  { nome: 'God of War', categoria: 'Ação', preco: 199.99, imagem: 'https://cdn.kobo.com/book-images/66eb1899-ef30-45dd-b925-e9d4ddc2bad4/353/569/90/False/god-of-war-4-1.jpg' },
  
  { nome: 'EA FC 25', categoria: 'Esporte', preco: 249.90, imagem: 'https://cdn.awsli.com.br/600x700/2083/2083959/produto/296891990/86dc552e-7221-4ec5-a78d-5591f7837ab7-xjz59i8sb4.jpg' },
  
  { nome: 'The Last of Us Part II Remastered', categoria: 'Ação', preco: 299.90, imagem: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/3a33a4b0a02b54074d4989a4118a4b594815d945b44a82cf.png' },
  
  { nome: 'Red Dead Redemption 2', categoria: 'Aventura', preco: 199.99, imagem: 'https://upload.wikimedia.org/wikipedia/pt/e/e7/Red_Dead_Redemption_2.png' },
  
  { nome: 'Grand Theft Auto 5 GTA', categoria: 'Ação', preco: 179.90, imagem: 'https://dw0jruhdg6fis.cloudfront.net/producao/17961901/G/ps4gtavpremium.jpg' },
];

export default function App() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [mensagem, setMensagem] = useState('');
  const [precoMax, setPrecoMax] = useState(300);
  const [volume, setVolume] = useState(50);
  const [somenteAcao, setSomenteAcao] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(false);

  const filtrarJogos = () => {
    return jogosMock.filter(jogo => {
      const nomeOk = jogo.nome.toLowerCase().includes(busca.toLowerCase());
      const categoriaOk = categoria === 'Todos' || jogo.categoria === categoria;
      const precoOk = jogo.preco <= precoMax;
      const acaoOk = !somenteAcao || jogo.categoria === 'Ação';
      return nomeOk && categoriaOk && precoOk && acaoOk;
    });
  };

  const comprarJogo = (nome) => {
    setMensagem('Compra realizada com sucesso', {nome});
    setTimeout(() => setMensagem(''), 3000); 
  };

  const limparFiltros = () => {
    setBusca('');
    setCategoria('Todos');
    setPrecoMax(300);
    setSomenteAcao(false);
    setModoEscuro(false);
  };

  const verTodos = () => {
    setCategoria('Todos');
  };

  const theme = modoEscuro ? styles.dark : styles.light;

  return (
    <View style={[styles.container, theme]}>
      <Text style={styles.title}>NextLevelGames!</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar jogo..."
        value={busca}
        onChangeText={setBusca}
      />

      <Picker
        selectedValue={categoria}
        style={styles.picker}
        onValueChange={(itemValue) => setCategoria(itemValue)}
      >
        <Picker.Item label="Todos" value="Todos" />
        <Picker.Item label="Ação" value="Ação" />
        <Picker.Item label="RPG" value="RPG" />
        <Picker.Item label="Corrida" value="Corrida" />
        <Picker.Item label="Esporte" value="Esporte" />
        <Picker.Item label="Aventura" value="Aventura" />
      </Picker>

      <Text>Preço máximo: R$ {precoMax}</Text>
      <Slider
        minimumValue={100}
        maximumValue={500}
        step={10}
        value={precoMax}
        onValueChange={value => setPrecoMax(value)}
      />

      <Text>Volume (Exemplo): {volume}</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={volume}
        onValueChange={value => setVolume(value)}
      />

      <View style={styles.switchContainer}>
        <Text>Somente Ação:</Text>
        <Switch value={somenteAcao} onValueChange={setSomenteAcao} />
      </View>

      <View style={styles.switchContainer}>
        <Text>Modo Escuro:</Text>
        <Switch value={modoEscuro} onValueChange={setModoEscuro} />
      </View>

      <View style={styles.ExtraButton}>
        <TouchableOpacity style={styles.ExtraButton} onPress={limparFiltros}>
          <Text style={styles.textoButton}>Limpar Filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ExtraButton} onPress={verTodos}>
          <Text style={styles.textoButton}>Ver Todos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtrarJogos()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              <TouchableOpacity style={styles.botao} onPress={() => comprarJogo(item.nome)}>
                <Text style={styles.textoButton}>Comprar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {mensagem !== '' && <Text style={styles.compraRealizada}>{mensagem}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  light: {
    backgroundColor: 	'#D3D3D3'
  },
  dark: {
    backgroundColor: '#1c1c1c'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  picker: {
    marginBottom: 10
  },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#FFFAFA'
  },
  imagem: {
    width: 100,
    height: 100,
    marginRight: 10
  },
  info: {
    flex: 1,
    justifyContent: 'space-between'
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  preco: {
    fontSize: 16,
    color: '#000000'
  },
  botao: {
    backgroundColor: '#FF4500',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center'
  },
  textoButton: {
    color: '#C0C0C0',
    fontWeight: 'bold'
  },
  mensagem: {
    marginTop: 15,
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  botoesExtras: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  ExtraButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5
  }
});
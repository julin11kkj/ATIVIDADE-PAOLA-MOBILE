import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView 
} from 'react-native';

// Lista com 10 periféricos de informática
const PRODUTOS = [
  { id: '1', nome: 'Mouse Gamer RGB 12000 DPI', preco: 189.90, categoria: 'Mouses', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400' },
  { id: '2', nome: 'Teclado Mecânico Switch Blue', preco: 299.90, categoria: 'Teclados', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
  { id: '3', nome: 'Headset Gamer 7.1 Surround', preco: 249.00, categoria: 'Áudio', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400' },
  { id: '4', nome: 'Monitor Gamer 24" 144Hz IPS', preco: 899.00, categoria: 'Monitores', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
  { id: '5', nome: 'Mousepad Extra Grande (90x40cm)', preco: 79.90, categoria: 'Acessórios', img: 'https://images.unsplash.com/photo-1632292224971-0d45778bd364?w=400' },
  { id: '6', nome: 'Webcam Full HD 1080p c/ Microfone', preco: 159.00, categoria: 'Streaming', img: 'https://images.unsplash.com/photo-1603162591400-0906236b2803?w=400' },
  { id: '7', nome: 'Microfone Condensador USB profissional', preco: 340.00, categoria: 'Streaming', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400' },
  { id: '8', nome: 'Caixa de Som Barra de Som RGB', preco: 120.00, categoria: 'Áudio', img: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=400' },
  { id: '9', nome: 'Controle Gamer Sem Fio para PC', preco: 199.90, categoria: 'Controles', img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400' },
  { id: '10', nome: 'Hub USB-C 4 Portas Alumínio', preco: 89.00, categoria: 'Acessórios', img: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400' },
];

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const limparCarrinho = () => setCarrinho([]);

  const totalCarrinho = carrinho.reduce((soma, item) => soma + item.preco, 0);

  // Renderização de cada periférico (Layout adaptado para telas maiores)
  const renderProduto = ({ item }) => (
    <View style={styles.cardProduto}>
      <Image source={{ uri: item.img }} style={styles.fotoProduto} />
      <View style={styles.infoProduto}>
        <Text style={styles.categoriaText}>{item.categoria}</Text>
        <Text style={styles.nomeProduto}>{item.nome}</Text>
        <Text style={styles.precoProduto}>R$ {item.preco.toFixed(2)}</Text>
        <TouchableOpacity style={styles.botaoComprar} onPress={() => adicionarAoCarrinho(item)}>
          <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com o Fundo atrás do Logo */}
      <View style={styles.containerLogoFundo}>
        <View style={styles.fundoDoLogo}>
          <Image 
            source={{ uri: 'https://img.icons8.com/fluent/96/000000/motherboard.png' }} 
            style={styles.logoLoja} 
          />
          <Text style={styles.tituloLoja}>TECH MATRIX</Text>
          <Text style={styles.subtituloLoja}>Os melhores periféricos do mercado</Text>
        </View>
      </View>

      {/* Corpo Principal - Grid de Produtos + Barra Lateral do Carrinho */}
      <View style={styles.conteudoPrincipal}>
        
        {/* Seção do Catálogo */}
        <View style={styles.vitrineContainer}>
          <Text style={styles.tituloSecao}>Catálogo de Periféricos</Text>
          <FlatList
            data={PRODUTOS}
            renderItem={renderProduto}
            keyExtractor={item => item.id}
            numColumns={Dimensions.get('window').width > 768 ? 2 : 1}
            key={Dimensions.get('window').width > 768 ? '2-columns' : '1-column'}
            scrollEnabled={false} // Deixa o Scroll por conta do ScrollView principal
          />
        </View>

        {/* Seção Lateral do Carrinho (Ideal para visualização em PC) */}
        <View style={styles.carrinhoContainer}>
          <Text style={styles.tituloSecao}>Seu Carrinho ({carrinho.length})</Text>
          {carrinho.length === 0 ? (
            <Text style={styles.carrinhoVazio}>O carrinho está vazio.</Text>
          ) : (
            <View>
              {carrinho.map((item, index) => (
                <View key={index} style={styles.itemCarrinho}>
                  <Text style={styles.itemCarrinhoNome} numberOfLines={1}>{item.nome}</Text>
                  <Text style={styles.itemCarrinhoPreco}>R$ {item.preco.toFixed(2)}</Text>
                </View>
              ))}
              <View style={styles.divisor} />
              <View style={styles.totalContainer}>
                <Text style={styles.totalTexto}>Total:</Text>
                <Text style={styles.totalValor}>R$ {totalCarrinho.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.botaoFinalizar} onPress={limparCarrinho}>
                <Text style={styles.botaoTexto}>Finalizar Compra</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117', // Fundo escuro estilo gamer/computador
  },
  // Elemento solicitado: Fundo trabalhado e destacado atrás do Logo
  containerLogoFundo: {
    width: '100%',
    paddingVertical: 40,
    backgroundColor: '#161b22', 
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#58a6ff', // Linha azul neon de destaque
  },
  fundoDoLogo: {
    backgroundColor: '#0a0c10', // Fundo contrastante logo atrás do logo/texto
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    width: '90%',
    maxWidth: 600,
    shadowColor: '#58a6ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8, // Sombra para Android/Web
  },
  logoLoja: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  tituloLoja: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtituloLoja: {
    color: '#8b949e',
    fontSize: 14,
    marginTop: 5,
  },
  conteudoPrincipal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'center',
  },
  vitrineContainer: {
    flex: 2,
    minWidth: 320,
    marginRight: 20,
  },
  tituloSecao: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardProduto: {
    flex: 1,
    backgroundColor: '#161b22',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#30363d',
    minWidth: 280,
  },
  fotoProduto: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  infoProduto: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  categoriaText: {
    color: '#58a6ff',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  nomeProduto: {
    color: '#c9d1d9',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 4,
  },
  precoProduto: {
    color: '#2ea44f', // Verde para o preço
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoComprar: {
    backgroundColor: '#21262d',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#8b949e',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Barra Lateral do Carrinho
  carrinhoContainer: {
    flex: 1,
    minWidth: 280,
    maxWidth: 400,
    backgroundColor: '#161b22',
    padding: 20,
    borderRadius: 8,
    height: 'fit-content',
    borderWidth: 1,
    borderColor: '#30363d',
    marginTop: 50,
  },
  carrinhoVazio: {
    color: '#8b949e',
    fontStyle: 'italic',
  },
  itemCarrinho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  itemCarrinhoNome: {
    color: '#c9d1d9',
    flex: 2,
  },
  itemCarrinhoPreco: {
    color: '#2ea44f',
    flex: 1,
    textAlign: 'right',
  },
  divisor: {
    height: 1,
    backgroundColor: '#30363d',
    marginVertical: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValor: {
    color: '#2ea44f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoFinalizar: {
    backgroundColor: '#2ea44f',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
});
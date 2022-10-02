import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon'; 
import './App.css';
import { Card } from './components/cards/card';
import { Navbar } from './components/navbar/navbar';
import { useSyncExternalStore } from 'react';

export const App = () => {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [prevURL, setPrevURL] = useState('');
  const [nextURL, setNextURL] = useState('');

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  
  const handlePrevPage = async () => {
    if(!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  };

  const handleNextPage = async () => {
    if(!nextURL) return;
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    console.log(data);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  }

  // 1回だけ実行してほしいからuseEffectの第2引数[]を使っている。
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      // データをとってくるまで待ってもらう処理(非同期処理)
      let res = await getAllPokemon(initialURL);
      setPrevURL(res.previous);
      setNextURL(res.next);
      console.log(res);

      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, [])

  return (
    <>
      <Navbar />
        {loading ?
        <h1>NowLoading...</h1> : 
        <>
          <div className='pokemonCardContainer'>
            {pokemonData.map((pokemon, index) => {
              return <Card key={index} pokemon={pokemon} />
            })}
          </div>
          <div className="btn">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
        }
    </>
  )
}
export const getAllPokemon = (url) => {
    return new Promise((resolve) => {
        fetch(url) // fetchでデータを取得してくる
        .then(res => res.json() // 取得できたらjson形式で返す
        .then(data => resolve(data))); // 最終的なデータとして返す
    });
}

// export const getAllPokemon = (url) => {
//     return new Promise((resolve) => {
//         fetch(url).then((res) => {
//             console.log(res);
//             return res.json();
//         }).then((data) => {
//             console.log(data);
//             return data;
//         });
//     });
// };

export const getPokemon = (url) => {
    return new Promise((resolve) => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
}
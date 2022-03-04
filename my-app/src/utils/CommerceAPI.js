import { PRODUCTS_URL, HEADERS } from "./data";

class CODING_PRODUCTS {
    async fetchProducts(){
        return new Promise(async (resolve, reject) => {
            try {
                const resp = await fetch(PRODUCTS_URL, {headers: HEADERS });
                if (resp.ok){
                    const json = await resp.json();
                    const gallery = json.data
                        .filter((item) => item.price.raw)
                        .map(item => ({
                            id: item.id,
                            name: item.name,
                            desc: item.description,
                            price: item.price.formatted_with_symbol,
                            img: item.assets[0].url,
                            raw_price: item.price.raw,
                            count: item.inventory.available + 1
                  }));
                  resolve({resp, gallery})
                } else {
                    reject({err: 'Invalid Request'})
                }
            } catch(err) {
                    reject(err)
            }
        })
    }
}

export default CODING_PRODUCTS;
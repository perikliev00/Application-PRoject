export async function deleteElement(id) {
    await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        console.log('Item deleted successfully');
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
}
export async function getData() {
    let response = await fetch('http://localhost:3030/jsonstore/cookbook');
    let data = await response.json();
    return data;
} 
export async function deleteData(id) {
    await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
}
export async function editData(id,data) {
    const response=await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`,{
                        method:'put',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify(data)
                    }) 
}
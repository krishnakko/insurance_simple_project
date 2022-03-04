export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const monthMap = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };

export const chartInfo = {
    series: [{
        name: "Yearly Policy Information",
        data: []
    }],
    options: {
        chart: {
            id: "yearly-policy"
        },
        xaxis: { categories: [months] }
    },
};

// export const getRandomColors = (count) => {
//     let colors = [];
//     for (let i = 0; i < count; i++) {
//         colors.push(Math.floor(Math.random() * 16777215).toString(16));
//     }
//     return colors;
// }
const colors = ["IndianRed", "LightSalmon", "Red", "DarkRed", "DeepPink", "PaleVioletRed", "Coral", "Tomato", "Orange", "Gold", "Moccasin", "Plum", "SlateBlue", "Lime", "Green", "Olive", "Aquamarine", "CadetBlue"];
export const getRandomColors = (count) => {
    return colors.sort(() => Math.random() - Math.random()).slice(0, count);
    // let colors = [];
    // for (let i = 0; i < count; i++) {
    //     colors.push(Math.floor(Math.random() * 16777215).toString(16));
    // }
    // return colors;
}


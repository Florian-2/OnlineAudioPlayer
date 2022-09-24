export function formatTime(currentTime: number): string {    
    return Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2);
}

export function generateRandomNumberArr(length: number) {
    const array = [...Array(length).keys()];
    let i = length;
    let randomNumber = 0;
    let temp: number;

    while (i--) {
        randomNumber = Math.floor(Math.random() * (i + 1));

        temp = array[i];
        array[i] = array[randomNumber];
        array[randomNumber] = temp;
    }

    return array;
}
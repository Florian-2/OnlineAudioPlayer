export function formatTime(currentTime: number): string {
    return Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2);
}
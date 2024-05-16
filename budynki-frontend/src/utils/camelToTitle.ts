export default function camelToTitle(string: string): string {
    string = string.replace(/([A-Z]+)/g, " $1");
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string;
}
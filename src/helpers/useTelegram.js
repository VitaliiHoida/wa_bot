const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;
const queryId = tg.initDataUnsafe?.query_id;

export function useTelegram() {

    return{
        tg,
        user,
        queryId,
    }
}
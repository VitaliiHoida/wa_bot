const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;
const queryId = tg.initDataUnsafe?.query_id;
const chatId = tg.Chat?.id;

export function useTelegram() {

    return{
        tg,
        user,
        queryId,
        chatId
    }
}
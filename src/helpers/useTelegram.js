const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;
const queryId = tg.initDataUnsafe?.query_id;
const chatId = tg.getUpdates?.results.channel_post.chat.id;

export function useTelegram() {

    return{
        tg,
        user,
        queryId,
        chatId
    }
}
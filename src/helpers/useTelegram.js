const tg = window.Telegram.WebApp;

export function useTelegram() {

    return{
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        theme_type: tg.account.getTheme

    }
}
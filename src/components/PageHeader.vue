<template>
    <table class="lg:w-[80%] w-[95%] font-[Courgette]">
        <tr>
            <td>
                <h1
                    v-if="streamerCount <= 0"
                    class="text-center text-4xl pt-8 font-[Courgette]"
                >
                    {{ t("nolive") }}
                </h1>
                <h1
                    v-if="streamerCount > 0"
                    :title="
                        t('tooltips.streamer', {
                            streamer_count: streamerCount,
                        })
                    "
                >
                    {{ t("streamer_head", { count: streamerCount }) }}
                </h1>
            </td>
        </tr>
    </table>
    <table class="lg:w-[60%] w-[95%]">
        <tr
            :title="
                t('tooltips.altv_version', {
                    version: altv_server ? altv_server.version : '',
                })
            "
        >
            <td>
                <a
                    href="https://altv.mp"
                    rel="noopener noreferrer"
                    referrerpolicy="no-referrer"
                    target="_blank"
                >
                    {{ t("altv_head_version") }}
                </a>
            </td>
            <td>
                {{ altv_server ? altv_server.version : "0.0" }}
            </td>
        </tr>
        <tr
            :title="
                altv_server_active
                    ? t('tooltips.gameserver_1')
                    : t('tooltips.gameserver_2')
            "
        >
            <td>
                <a
                    :href="`https://api.alt-mp.com/server/${
                        altv_server ? altv_server['publicId'] : ''
                    }`"
                    rel="noopener noreferrer"
                    referrerpolicy="no-referrer"
                    target="_blank"
                >
                    {{ t("game_server_head") }}
                </a>
            </td>
            <td>{{ altv_server ? "Online ✔️" : "Offline ❌" }}</td>
        </tr>
        <tr
            :title="
                altv_server
                    ? t('tooltips.players', {
                          player: altv_server.playersCount,
                      })
                    : ''
            "
        >
            <td>{{ t("players_online_head") }}</td>
            <td>
                {{
                    altv_server
                        ? altv_server["playersCount"] +
                          "/" +
                          altv_server["maxPlayersCount"]
                        : "0/0"
                }}
            </td>
        </tr>
        <tr :title="t('tooltips.viewer', { viewer: viewerCount })">
            <td>{{ t("viewers_head") }}</td>
            <td>{{ viewerCount }}</td>
        </tr>
        <tr :title="t('tooltips.refresh')">
            <td>{{ t("last_refresh_head") }}</td>
            <td>{{ last_update }}</td>
        </tr>
    </table>
</template>

<style lang="css" scoped>
table {
    @apply mt-1 mx-auto border-collapse shadow-xl;
}

th,
td {
    @apply p-3;
}

tr:nth-of-type(even) {
    @apply bg-slate-300 dark:bg-[#2e2e2e];
}

h1 {
    @apply m-[2%] lg:text-6xl text-4xl text-center;
}

h1,
table {
    @apply text-black dark:text-white;
}
</style>

<script setup lang="ts">
import { onMounted, onUnmounted, onBeforeMount, ref } from "vue"
import { useI18n } from "vue-i18n"
import api from "../mixins/api.js"

const { locale, t } = useI18n({
    useScope: "local",
    inheritLocale: true,
})

const props = defineProps({
    streamerCount: {
        type: Number,
        required: true,
    },
    viewerCount: {
        type: Number,
        required: true,
    },
})

const altv_server_active = ref<boolean>(false)
const last_update = ref<string>(t("last_update_never"))
const update_timer = ref<null | number>(null)
let fetching_server: boolean = false;
const altv_server = ref<Server | null>(null)

async function fetch_altv_server() {
    if (fetching_server) {
        console.warn("we are still fetching the server data!")
        return
    }
    fetching_server = true;
    const api_response = await api.fetch_or_cache(
        `https://api.alt-mp.com/servers/${import.meta.env.VITE_ALTV_SERVER_ID}`,
        "altv_server_data"
    )

    last_update.value = new Date().toLocaleTimeString(locale)

    if (api_response["available"]) {
        altv_server.value = api_response
        altv_server_active.value = api_response["available"]
    }
    fetching_server = false;
}

onBeforeMount(async () => {
    await fetch_altv_server()
})

onMounted(() => {
    if (update_timer.value == null) {
        update_timer.value = setInterval(() => {
            fetch_altv_server()
        }, 120000)
    }
})

onUnmounted(() => {
    if (update_timer.value) {
        clearInterval(update_timer.value)
    }
})
</script>

<i18n lang="json">
{
    "de": {
        "streamer_head": "Streamer:innen Online: {count}",
        "nolive": "Leider ist aktuell kein Streamer:in live. 😴",
        "altv_head_version": "alt:V Version:",
        "game_server_head": "Gameserver Status:",
        "players_online_head": "Spieler:innen Online:",
        "viewers_head": "Zuschauer:innen insgesamt:",
        "last_refresh_head": "Zuletzt aktualisiert:",
        "last_update_never": "Nie",
        "tooltips": {
            "streamer": "Es sind gerade {streamer_count} Streamer:innen live.",
            "altv_version": "Der Server benutzt die alt:V Version {version}.",
            "gameserver_1": "Der Gameserver ist Online.",
            "gameserver_2": "Der Gameserver ist Offline.",
            "players": "Aktuell spielen {player} Spieler:innen auf dem Server.",
            "viewer": "Insgesamt schauen {viewer} Zuschauer:innen Streamer:innen von LuckyV zu.",
            "refresh": "Die Daten auf dieser Website wurden zuletzt um diese Uhrzeit aktualisiert."
        }
    },
    "en": {
        "streamer_head": "Streamers Online: {count}",
        "nolive": "Unfortunately there is no streamer live at the moment. 😴",
        "altv_head_version": "alt:V Version:",
        "game_server_head": "Gameserver Status:",
        "players_online_head": "Players Online:",
        "viewers_head": "Total viewers:",
        "last_refresh_head": "Last refresh:",
        "last_update_never": "Never",
        "tooltips": {
            "streamer": "There are {streamer_count} streamers live right now.",
            "altv_version": "The server is using alt:V Version {version}.",
            "gameserver_1": "The Gameserver is online.",
            "gameserver_2": "The Gameserver is offline.",
            "players": "Currently {player} players are playing on the server.",
            "viewer": "A total of {viewer} viewers are watching streamers from LuckyV.",
            "refresh": "The data on this website was last updated at this time."
        }
    }
}
</i18n>

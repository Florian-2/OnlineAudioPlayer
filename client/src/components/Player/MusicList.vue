<script lang="ts" setup>
import type { Music } from '@/shared/interfaces';

const emit = defineEmits<{
    (e: "selectMusic", index: number): void
}>();

defineProps<{
    musics: Music[];
}>();
</script>

<template>
    <div class="table-list-music">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Titre</th>
                    <th>Artiste</th>
                    <th>Album</th>
                    <th>Durée</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(music, i) of musics" :key="music._id" @click="emit('selectMusic', i)">
                    <td>{{ i + 1 }}</td>
                    <td>{{ music.title }}</td>
                    <td>{{ music.artists?.join(" / ") }}</td>
                    <td>{{ music.album }}</td>
                    <td>{{ music.formatDuration }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.table-list-music {
    color: white;

    table {
        width: 100%;
        border-collapse: collapse;

        thead, tbody {
            padding: 1rem;
        }

        th {
            font-size: 1.5rem;
            padding-bottom: 1rem;
            text-transform: uppercase;
            text-align: start;
            // background-color: rgba(240, 248, 255, 0.155);

            &:first-child {
                width: 30px;
            }
        }

        tr {
            cursor: pointer;

            &:hover {
                background-color: rgba(240, 248, 255, 0.155);
            }

            td {
                padding: 1rem 0;
                font-size: 1.4rem;
            }
        }
    }
}
</style>
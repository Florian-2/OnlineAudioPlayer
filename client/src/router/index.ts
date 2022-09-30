import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { useUser } from '@/stores/user';
import { isAuthenticated, isNotAuthenticated } from '@/guards/auth.guards';
import { initialFetchMusics } from '@/services/music.services';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			alias: "/home",
			name: "Home",
			meta: {
				title: "AudioPlayer - Accueil"
			},
			beforeEnter: [isNotAuthenticated],
			component: HomeView
		},
		{
			path: "/music-management/add-music",
			name: "AddMusic",
			meta: {
				title: "AudioPlayer - Ajouter des musiques à ma liste"
			},
			beforeEnter: [isAuthenticated],
			component: () => import('@/views/AddMusicView.vue')
		},
		{
			path: '/music-management/handle-music',
			name: "HandleMusics",
			meta: {
				title: "AudioPlayer - Gérer mes musiques"
			},
			beforeEnter: [isAuthenticated, initialFetchMusics],
            component: () => import('@/views/HandleMusicView.vue'),
		},
		{
			path: '/music-management/handle-music/edit/:id',
			name: "Edit",
			meta: {
				title: "AudioPlayer - Edition"
			},
			beforeEnter: [isAuthenticated, initialFetchMusics],
			component: () => import('@/views/EditMusicView.vue')
		},
		{
			path: "/audio-player",
			name: "Player",
			meta: {
				title: "AudioPlayer - Mes musiques"
			},
			beforeEnter: [isAuthenticated, initialFetchMusics],
		 	component: () => import('@/views/AudioPlayerView.vue')
		},
		{
			path: "/profil",
			name: "Profil",
			meta: {
				title: "AudioPlayer - Mon Profil"
			},
			beforeEnter: [isAuthenticated],
		 	component: () => import('@/views/ProfileView.vue')
		},
		{
			path: "/login",
			name: "Login",
			meta: {
				title: "AudioPlayer - Connexion"
			},
			beforeEnter: [isNotAuthenticated],
		 	component: () => import('@/views/LoginView.vue')
		},
		{
			path: "/register",
			name: "Register",
			meta: {
				title: "AudioPlayer - Inscription"
			},
			beforeEnter: [isNotAuthenticated],
		 	component: () => import('@/views/RegisterView.vue')
		},
		// {
		// 	path: "/:notfound(.*)*",
		// 	meta: {
		// 		title: "AudioPlayer - Page introuvable"
		// 	},
		// 	component: () => import("@/views/NotFoundView.vue"),
		// }
	]
})

router.beforeEach(async () => {
	const userStore = useUser();
	if (!userStore.loaded) {
	  await userStore.fetchCurrentUser();
	}
});

router.afterEach((to) => {
	const title = to.meta.title as string;
	document.title = title;
});

export default router;
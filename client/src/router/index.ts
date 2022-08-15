import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { useUser } from '@/stores/user';
import { isAuthenticated, isNotAuthenticated } from '@/guards/auth.guards';

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
			path: "/music-management",
			name: "Music Management",
			meta: {
				title: "AudioPlayer - Gérer mes musiques"
			},
			beforeEnter: [isAuthenticated],
		 	component: () => import('@/views/AddMusicView.vue')
		},
		{
			path: "/audio-player",
			name: "Player",
			meta: {
				title: "AudioPlayer - Mes musiques"
			},
			beforeEnter: [isAuthenticated],
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
			path: "/favorite",
			name: "Favorite",
			meta: {
				title: "AudioPlayer - Mes musiques favorites"
			},
			beforeEnter: [isAuthenticated],
		 	component: () => import('@/views/FavoriView.vue')
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
		{
			path: "/:notfound(.*)*",
			meta: {
				title: "AudioPlayer - Page introuvable"
			},
			component: () => import("@/views/NotFoundView.vue")
		}
	]
})

router.beforeEach(async () => {
	const userStore = useUser();
	if (!userStore.loaded) {
	  await userStore.fetchCurrentUser();
	}
});

router.afterEach((to, from) => {
	const title = to.meta.title;

	if (typeof title === "string") {
		document.title = title;
	}
});

export default router;
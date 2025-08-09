import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	root: "./src",
	publicDir: '../public',
	build: {
		outDir: "../dist",
		emptyOutDir: true,
		modulePreload: false,
		manifest: false,
		cssCodeSplit: true,
		assetsInlineLimit: 0,
		rollupOptions: {
			input: {
				'404': resolve(__dirname, 'src/404.html'),
				'blog': resolve(__dirname, 'src/blog.html'),
				'contacts': resolve(__dirname, 'src/contacts.html'),
				'favourites': resolve(__dirname, 'src/favourites.html'),
				'favourites-2': resolve(__dirname, 'src/favourites-2.html'),
				'home': resolve(__dirname, 'src/home.html'),
				'index': resolve(__dirname, 'src/index.html'),
				'object': resolve(__dirname, 'src/object.html'),
				'object-2': resolve(__dirname, 'src/object-2.html'),
				'object-3': resolve(__dirname, 'src/object-3.html'),
				'object-4': resolve(__dirname, 'src/object-4.html'),
				'policy': resolve(__dirname, 'src/policy.html'),
				'post': resolve(__dirname, 'src/post.html'),
				'project': resolve(__dirname, 'src/project.html'),
				'region': resolve(__dirname, 'src/region.html'),
				'rekl': resolve(__dirname, 'src/rekl.html'),
				'search-result': resolve(__dirname, 'src/search-result.html'),
				'search-result-2': resolve(__dirname, 'src/search-result-2.html')
			},
			output: {
				entryFileNames: 'js/index.js',
				chunkFileNames: 'js/index.js',
				manualChunks: () => 'index',
				assetFileNames: ({ name }) => {
					const extType = name.split('.').at(-1).toLowerCase()
					if (extType === 'css') {
						return 'css/index.css'
					}

					const imgExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif']
					if (imgExtensions.includes(extType)) {
						return 'img/[name][extname]'
					}
					return '[name][extname]'
				},
			}

		}
	},
	resolve: {
		alias: {
			'@scss': resolve(__dirname, './src/scss'),
		}
	},
	plugins: [
		{
			name: 'reload',
			configureServer(server) {
				const { ws, watcher } = server;
				watcher.on('change', file => {
					if (file.endsWith('.html')) {
						ws.send({
							type: 'full-reload',
						});
					}
				});
			},
		},
	],
})
// This file now focuses only on unregistering existing service workers and clearing caches

export async function unregisterAllServiceWorkers() {
	if ('serviceWorker' in navigator) {
		try {
			// Get all registered service workers
			const registrations = await navigator.serviceWorker.getRegistrations();

			console.log(`Found ${registrations.length} service worker(s) to unregister`);

			// Unregister each service worker
			for (const registration of registrations) {
				await registration.unregister();
				console.log('Service worker unregistered successfully');
			}

			// Clear all caches
			await clearAllCaches();

			// Reload the page if service workers were found and unregistered
			if (registrations.length > 0) {
				console.log('Reloading page to apply changes');
				window.location.reload(true);
			}
		} catch (error) {
			console.error('Error unregistering service workers:', error);
		}
	}
};

async function clearAllCaches() {
	try {
		// Check if caches API is available
		if ('caches' in window) {
			// Get all cache keys
			const cacheKeys = await caches.keys();

			console.log(`Found ${cacheKeys.length} cache(s) to clear`);

			// Delete each cache
			await Promise.all(
				cacheKeys.map(cacheKey => {
					console.log('Deleting cache:', cacheKey);
					return caches.delete(cacheKey);
				})
			);
			console.log('All caches cleared successfully');
		}
	} catch (error) {
		console.error('Error clearing caches:', error);
	}
};
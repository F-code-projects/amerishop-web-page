// import { Injectable, isDevMode } from '@angular/core';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class GoogleAnalyticsService {
//   constructor() {
//     if (!isDevMode()) {
//       // Solo en producción
//       this.loadGoogleAnalytics();
//     }
//   }

//   private loadGoogleAnalytics() {
//     const script = document.createElement('script');
//     script.async = true;
//     script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalyticsId}`;
//     document.head.appendChild(script);

//     (window as any).dataLayer = (window as any).dataLayer || [];
//     function gtag(...args: any[]) {
//       (window as any).dataLayer.push(args);
//     }
//     (window as any).gtag = gtag;
//     gtag('js', new Date());
//     gtag('config', environment.googleAnalyticsId);
//   }

//   trackEvent(eventName: string, params?: any) {
//     (window as any).gtag('event', eventName, params);
//   }
// }

#import "AppDelegate.h"

#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h" 

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
   NSString *googleApiKey = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"GOOGLE_MAP_API_KEY"];
  [GMSServices provideAPIKey:googleApiKey];
  self.moduleName = @"matzipapp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];  
  return YES;

}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

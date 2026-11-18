#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>
@interface Game : NSObject <WKUIDelegate,NSApplicationDelegate>
@end
@implementation Game
- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication*)app{return YES;}
- (void)webView:(WKWebView*)v runOpenPanelWithParameters:(WKOpenPanelParameters*)p initiatedByFrame:(WKFrameInfo*)f completionHandler:(void (^)(NSArray<NSURL*>*))cb {NSOpenPanel* panel=[NSOpenPanel openPanel];panel.allowsMultipleSelection=p.allowsMultipleSelection;cb([panel runModal]==NSModalResponseOK?panel.URLs:nil);}
@end
int main(){@autoreleasepool{NSApplication* app=[NSApplication sharedApplication];[app setActivationPolicy:NSApplicationActivationPolicyRegular];Game* game=[Game new];app.delegate=game;NSWindow* win=[[NSWindow alloc]initWithContentRect:NSMakeRect(0,0,1120,740) styleMask:15 backing:NSBackingStoreBuffered defer:NO];win.title=@"Recall Raid";WKWebView* web=[[WKWebView alloc]initWithFrame:win.contentView.bounds];web.UIDelegate=game;win.contentView=web;NSURL* url=[[NSBundle mainBundle]URLForResource:@"hra" withExtension:@"html"];[web loadFileURL:url allowingReadAccessToURL:url]; NSMenu* menu=[NSMenu new];NSMenuItem* item=[NSMenuItem new];[menu addItem:item];NSMenu* sub=[NSMenu new];item.submenu=sub;[sub addItemWithTitle:@"Ukončit Recall Raid" action:@selector(terminate:) keyEquivalent:@"q"];item=[NSMenuItem new];[menu addItem:item];sub=[[NSMenu alloc]initWithTitle:@"Úpravy"];item.submenu=sub;for(NSArray* e in @[@[@"Vyjmout",@"cut:",@"x"],@[@"Kopírovat",@"copy:",@"c"],@[@"Vložit",@"paste:",@"v"],@[@"Vybrat vše",@"selectAll:",@"a"]]) [sub addItemWithTitle:e[0] action:NSSelectorFromString(e[1]) keyEquivalent:e[2]];app.mainMenu=menu;[win center];[win makeKeyAndOrderFront:nil];[app activateIgnoringOtherApps:YES];[app run];}return 0;}

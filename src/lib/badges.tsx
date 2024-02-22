
// Tandetta - Badges.tsx
// This is a work in progress!
// 
// The badges implementation is a WIP and does not currently work.
// Until a specified line in src/index.ts is uncommented, this
// module will not load. Fixes would be appreciated.

import { findByName } from "@metro/filters";
import Patcher from "@lib/patcher";
import { ReactNative as RN, React } from "@metro/common";
import { BadgeComponent } from "@ui/components/Badge";
import logger from "@lib/logger";
const StockBadgeComponent = findByName('RenderedBadge')

const { View } = RN;

interface Badges {
  dev?: boolean,
  contributor?: boolean,
  tester?: boolean,
  waltuh?: boolean
}

interface BadgeCache {
  badges: Badges;
  lastFetch: number;
}

interface BadgeProps {
  name: string,
  image: string,
  key: string,
}

export default function patchBadges() {
  const profileBadges = findByName("ProfileBadges", false);
    Patcher.after("default", profileBadges, (args, res) => {
      let bobj = res;
      const user = args[0]?.user;
      if(user === undefined) return;
      const style = res?.props?.style
      // Remove when badges are finished
      logger.log('BADGES: res\n' + JSON.stringify(res))
      if (!bobj) {
        bobj = <View 
            style={[style, { 
              flexDirection: "row", 
              flexWrap: 'wrap', 
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              paddingVertical: 2
            }]} 
            accessibilityRole={"list"}
            accessibilityLabel={"User Badges"}
        />;
          bobj.props.children = [];
      }
      const pushBadge = ({ name, image, key }: BadgeProps) => {
        logger.log('BADGES: pushing '+key+' for '+user.id)
        const RenderableBadge = () => <BadgeComponent
          name={name}
          image={image}
          key={key}
          size={Array.isArray(style) ? style?.find(r => r.paddingVertical && r.paddingHorizontal) ? 16 : 22 : 16}
          margin={Array.isArray(style) ? 4 : 6}
        />
        bobj.props.children = [...bobj.props.children, RenderableBadge];
        logger.log('BADGES: res children\n' + JSON.stringify(bobj.props.children))
      }
      
      fetchBadges(user.id).then(data => {
        let badges = data as Badges
        logger.log('got badges: ' + JSON.stringify(badges))
        Object.entries(badges).forEach(([key, value]): any => {
          console.log('BADGES: switching for '+key)
          switch (key) {
            case "dev":
              pushBadge({
                name: "Tandetta Developer",
                image: "https://tandetta.tanu.lol/get/badges_dev.png",
                key: "tandetta_dev"
              });
              break;
            case "contributor":
              pushBadge({
                name: "Tandetta Contributor",
                image: "https://tandetta.tanu.lol/get/badges_contributor.png",
                key: "tandetta_contributor"
              });
              break;
            case "tester":
              pushBadge({
                name: "Tandetta Tester",
                image: "https://tandetta.tanu.lol/get/badges_tester.png",
                key: "tandetta_tester"
              });
              break;
            case "waltuh":
              pushBadge({
                name: "WALTUH",
                image: "https://tandetta.tanu.lol/get/badges_waltuh.png",
                key: "tandetta_waltuh"
              });
              break;
            default:
              break;
          }
          /*if(key === "dev") {
            pushBadge({
              name: "Tandetta Developer",
              image: "https://tandetta.tanu.lol/get/badges_dev.png",
            });
          } if(key === "contributor") {
            pushBadge({
              name: "Tandetta Contributor",
              image: "https://tandetta.tanu.lol/get/badges_contributor.png",
            });
          } if(key === "tester") {
            pushBadge({
              name: "Tandetta Tester",
              image: "https://tandetta.tanu.lol/get/badges_tester.png",
            });
          } if(key === "waltuh") {
            pushBadge({
              name: "WALTUH",
              image: "https://tandetta.tanu.lol/get/badges_waltuh.png",
            });
          }*/
        });
      })
    });
}

function fetchBadges(userId: string) {
    logger.log('BADGES: Got user ID: ' + userId)
    const rs = fetch(`https://tandetta.tanu.lol/api/getBadges/${userId}`, {
      headers: {
        'Accept': "application/json"
      }
    }).then(r => r.json()).catch(() => {})
  return rs;
}

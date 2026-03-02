import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups, { OPEN_AD_ORDER } from './globalGroups';
import { RawApp, RawAppGroup } from '@gkd-kit/api';

const apps = await batchImportApps(`${import.meta.dirname}/apps`);
const rawApps: RawApp[] = [];
apps.forEach((appConfig) => {
  appConfig.groups?.forEach((g: RawAppGroup) => {
    if (g.name.startsWith('开屏广告')) {
      g.order = OPEN_AD_ORDER;
    }
  });
  rawApps.push(appConfig);
});

export default defineGkdSubscription({
  id: 518,
  name: 'AnonTokio的GKD订阅',
  version: 3,
  author: 'Anon Tokio',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/AnonTokio/gkd-subscription',
  categories,
  globalGroups,
  apps: rawApps,
});

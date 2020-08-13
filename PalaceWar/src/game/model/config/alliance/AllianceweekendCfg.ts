namespace Config {
	/**
	 * 帮战配置
	 */
    export namespace AllianceweekendCfg {
        /**展示期 */
        export let extraTime: number = 0;
        /**帮会等级限制 */
        export let allianceLv: number = 0;
        /**开启时间 */
        export let openTime: number = 0;
        /**战力符购买，全帮生效 */
        export let powerUp: any = null;
        /** 门客出战恢复道具 */
        export let needItem: string = null;
        /** 敌军属性 */
        export let foeItemCfgList: FoeItemCfg[] = [];
        /** 个人贡献 */
        export let peScoreItemCfgList: PeScoreItemCfg[] = [];
        /** npc配置 */
        export let npcCfgList: string[] = [
            "story_npc_2",
            "story_npc_5",
            "dailyboss_lv_3",
            "story_npc_3",
            "story_npc_4",
            "dailyboss_lv_4",
            "dailyboss_lv_2",
            "story_npc_9",
            "wipeboss5",
            "wipeboss4",
            "dailyboss_lv_5",
            "wipeboss6",
            "wipeboss7",
        ];
        /** 初始化数据*/
        export function formatData(data: any): void {
            extraTime = data.extraTime;
            allianceLv = data.allianceLv;
            openTime = data.openTime;
            powerUp = data.powerUp;
            needItem = data.needItem;
            for (let i = 0; i < data.foe.length; i++) {
                let itemCfg: FoeItemCfg = new FoeItemCfg();
                itemCfg.initData(data.foe[i]);
                itemCfg.id = Number(i) + 1;
                itemCfg.npc = npcCfgList[i];
                foeItemCfgList.push(itemCfg);
            }

            for (let key in data.peScore) {
                let itemCfg: PeScoreItemCfg = new PeScoreItemCfg();
                itemCfg.initData(data.peScore[key]);
                itemCfg.id = Number(key) + 1;
                peScoreItemCfgList.push(itemCfg);
            }
        }
        /**获得boss */
        export function getFoeItemCfgForBossId(id: number) {
            for (let key in foeItemCfgList) {
                if (foeItemCfgList[key].id == id) {
                    return foeItemCfgList[key];
                }
            }
            return null;
        }
        /**敌人属性配置 根据帮会等级 */
        export function getFoeItemCfgList() {
            let cfgList: FoeItemCfg[] = [];
            let allLv = Api.allianceVoApi.getAllianceVo().level;
            for (let key in foeItemCfgList) {
                if (allLv >= foeItemCfgList[key].alLvUnlock) {
                    cfgList.push(foeItemCfgList[key]);
                }
            }
            return cfgList;
        }
        /**敌人属性的最好一个配置 */
        export function lastFoeItemCfg(): FoeItemCfg {
            let cfgList = getFoeItemCfgList();
            return cfgList[cfgList.length - 1];
        }

        export function getMovePosY(): number {
            let l = 0;
            let boss = Api.allianceWeekVoApi.getNowBoss();
            if (boss) {
                for (let i = 0; i < getFoeItemCfgList().length; i++) {
                    if (boss.id >= getFoeItemCfgList()[i].id) {
                        l++;
                    }
                }
                // l = getFoeItemCfgList().length - l;
            }
            else {
                l = getFoeItemCfgList().length;
            }

            return l;
        }






        /**敌军Item */
        export class FoeItemCfg extends BaseItemCfg {
            /** id */
            public id: number = 0;
            /** Boss血量 */
            public bossHP: number = 0;
            /** 击杀积分和分数。给予BOSS最后一击才可获得击杀积分 */
            public killScore: number = 0;
            /** 单位分数血量。1分需要血量。最低为1分 */
            public unitScore: number = 0;
            /**帮会等级解锁 */
            public alLvUnlock: number = 0;
            /** 击杀奖励，全帮会都可获得。5个一行 */
            public getReward: string = null;
            /** npc */
            public npc: string = null;
        }

        /**敌军Item */
        export class PeScoreItemCfg extends BaseItemCfg {
            /** id */
            public id: number = 0;

            public sortId: number = 0;
            /** 分数 */
            public score: number = 0;
            /** 奖励 */
            public getReward: string = null;
        }

    }
}
namespace Config {
    export namespace SkilllevyCfg {

        let skillLevyData: {[index: string]: SkillLevyCfgItem} = {};
        let skillLevyList: SkillLevyCfgItem[] = [];

        export function formatData(data: any) {
            skillLevyData = {};
            skillLevyList = [];
            for (let sid in data) {
                let _item = new SkillLevyCfgItem();
                _item.skillId = sid;
                _item.levyId = data[sid].levyId;
                _item.addValue = data[sid].addValue;
                _item.unlockLevel = data[sid].unlockLevel;
                skillLevyData[sid] = _item;
                skillLevyList.push(_item);
            }
        }

        /**
         * 根据技能ID获取技能
         */
        export function getSkillLevyById(skillId: string): SkillLevyCfgItem {
            return skillLevyData[skillId];
        }

        // /**
        //  * 根据门客ID获取技能
        //  */
        // export function getSkillLevyByServantId(servantId: string): SkillLevyCfgItem {
        //     let _servant: ServantItemCfg = Config.ServantCfg.getServantItemById(servantId);
        //     if (_servant.skillLevy) {
        //         return Config.SkilllevyCfg.getSkillLevyById(_servant.skillLevy);
        //     } else {
        //         return null;
        //     }
        // }

        /**
         * 获取所有技能
         */
        export function getAllSkillLevy(): SkillLevyCfgItem[] {
            return skillLevyList;
        }
    }

    export class SkillLevyCfgItem extends BaseItemCfg {
        // public constructor(skillId: string, levyId: number, addValue: number, unlockLevel: number) {
        //     super();
        // }

        /**技能ID */
        public skillId: string;
        /**对应经营ID */
        public levyId: number;
        /**增长比 */
        public addValue: number;
        /**解锁等级 */
        public unlockLevel: number;

        /**技能名 */
        public get skillName(): string {
            return LanguageManager.getlocal("skillLevy_name" + this.skillId);
        }

        /**技能描述 */
        public get skillDes(): string {
            let _levyName = LanguageManager.getlocal(`levy_levyitem_title${this.levyId}`);
            let _upNum = this.addValue * 100;
            return LanguageManager.getlocal("levy_skill_des", [_levyName, _upNum.toString()]);
        }

        /**技能图标 */
        public get skillIconKey(): string {
            return "skillLevy_icon" + this.skillId;
        }
    }
}
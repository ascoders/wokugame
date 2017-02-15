import Buildings from './buildings'

const tips = new Map<number,string>()

// 与 upgrade user 合并

tips.set(0, `
你进入了一个宏伟的虚拟世界，并控制了一个星球。你拥有强大的领导能力与过人的天赋，这个星球所有生命都听命于你。<br/>
在这虚拟世界中，星球之间战争频发，你需要建造一座${Buildings.get('house').name}发展你的星球。`)

tips.set(1, `晶体矿是星球上重要的基础资源，所有建筑都需要晶体矿提供能源建造。现在可以建造一座 ${Buildings.get('crystal').name} 生产晶体矿。`)

tips.set(2, `瓦斯矿是极为稀有的资源，现在就开始开采吧。建造一座 ${Buildings.get('gas').name} 生产瓦斯。`)

tips.set(3, `为提高效率，至少拥有五个 ${Buildings.get('crystal').name} 和 ${Buildings.get('house').name}，以及两个 ${Buildings.get('gas').name}。`)

export default tips
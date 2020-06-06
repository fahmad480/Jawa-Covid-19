const Scene = require('Scene');
const Patches = require('Patches')
const Reactive = require('Reactive')
const Audio = require('Audio')
const Diagnostics = require('Diagnostics')
const Time = require('Time')

var banten = [965, 279, 69]
var jabar = [2354, 719, 155]
var jakarta = [7690, 2607, 523]
var jateng = [1479, 372, 71]
var jogja = [237, 174, 8]
var jatim = [5408, 1089, 437]
var update = "Juny 05 2020"
var output

function numCount(num) {
    Audio.getPlaybackController("transition").play()
    Patches.inputs.setVector("num", Reactive.vector(num[0], num[1], num[2]))
    Patches.inputs.setPulse("startNum", Reactive.once())
}

Scene.root.findFirst("name").then(obj => {
    obj.text = ""
})

Scene.root.findFirst("total1Jawa").then(obj => {
    var terk = banten[0]+jabar[0]+jakarta[0]+jateng[0]+jogja[0]+jatim[0]
    var semb = banten[1]+jabar[1]+jakarta[1]+jateng[1]+jogja[1]+jatim[1]
    var meni = banten[2]+jabar[2]+jakarta[2]+jateng[2]+jogja[2]+jatim[2]
    obj.text = "case in java island\nconfirmed: "+terk+"\nrecovered: "+semb+"\ndeaths: "+meni+"\nUPDATE: "+update
})

Scene.root.findFirst("totalIndonesia").then(obj => {
    var terk = 28818
    var semb = 8892
    var meni = 1721
    obj.text = "case in Indonesia\nconfirmed: "+terk+"\nrecovered: "+semb+"\ndeaths: "+meni+"\nUPDATE: "+update
})

function numLogic() {
    Patches.outputs.getVector('number').then(signal => {
        var x = signal.x.pinLastValue().toFixed(0)
        var y = signal.y.pinLastValue().toFixed(0)
        var z = signal.z.pinLastValue().toFixed(0)
        output = "confirmed: "+x+"\nrecovered: "+y+"\ndeaths: "+z
        Scene.root.findFirst('count').then(obj => {
            obj.text = output
        })
    })
    Patches.outputs.getVector('chartNum').then(signal => {
        var x = signal.x.pinLastValue().toFixed(0)
        var y = signal.y.pinLastValue().toFixed(0)
        var z = signal.z.pinLastValue().toFixed(0)
        Scene.root.findFirst('konfirmIndo').then(obj => {
            obj.text = x
        })
        Scene.root.findFirst('sembuhIndo').then(obj => {
            obj.text = y
        })
        Scene.root.findFirst('matiIndo').then(obj => {
            obj.text = z
        })
    })
}

Time.setInterval(numLogic, 1)

Patches.outputs.getPulse("b").then(signal => {
    signal.subscribe(event => {
        numCount(banten)
        Scene.root.findFirst("name").then(obj => {
            obj.text = "Banten"
        })
        Patches.inputs.setBoolean("bb", true)
        Patches.inputs.setBoolean("bj1", false)
        Patches.inputs.setBoolean("bj2", false)
        Patches.inputs.setBoolean("bj3", false)
        Patches.inputs.setBoolean("bj4", false)
        Patches.inputs.setBoolean("bj5", false)
    })
})

Patches.outputs.getPulse("j1").then(signal => {
    signal.subscribe(event => {
        numCount(jabar)
        Scene.root.findFirst("name").then(obj => {
            obj.text = "Jawa Barat"
        })
        Patches.inputs.setBoolean("bb", false)
        Patches.inputs.setBoolean("bj1", true)
        Patches.inputs.setBoolean("bj2", false)
        Patches.inputs.setBoolean("bj3", false)
        Patches.inputs.setBoolean("bj4", false)
        Patches.inputs.setBoolean("bj5", false)
    })
})

Patches.outputs.getPulse("j2").then(signal => {
    signal.subscribe(event => {
        numCount(jakarta)
        Scene.root.findFirst("name").then(obj => {
            obj.text = "DKI Jakarta"
        })
        Patches.inputs.setBoolean("bb", false)
        Patches.inputs.setBoolean("bj1", false)
        Patches.inputs.setBoolean("bj2", true)
        Patches.inputs.setBoolean("bj3", false)
        Patches.inputs.setBoolean("bj4", false)
        Patches.inputs.setBoolean("bj5", false)
    })
})

Patches.outputs.getPulse("j3").then(signal => {
    signal.subscribe(event => {
        numCount(jateng)
        Scene.root.findFirst("name").then(obj => {
            obj.text = "Jawa Tengah"
        })
        Patches.inputs.setBoolean("bb", false)
        Patches.inputs.setBoolean("bj1", false)
        Patches.inputs.setBoolean("bj2", false)
        Patches.inputs.setBoolean("bj3", true)
        Patches.inputs.setBoolean("bj4", false)
        Patches.inputs.setBoolean("bj5", false)
    })
})

Patches.outputs.getPulse("j4").then(signal => {
    signal.subscribe(event => {
        numCount(jogja)
        Scene.root.findFirst("name").then(obj => {
            obj.text = "DI Yogyakarta"
        })
        Patches.inputs.setBoolean("bb", false)
        Patches.inputs.setBoolean("bj1", false)
        Patches.inputs.setBoolean("bj2", false)
        Patches.inputs.setBoolean("bj3", false)
        Patches.inputs.setBoolean("bj4", true)
        Patches.inputs.setBoolean("bj5", false)
    })
})

Patches.outputs.getPulse("j5").then(signal => {
    signal.subscribe(event => {
        numCount(jatim)
        Scene.root.findFirst("name").then(obj => {
            obj.text = "Jawa Timur"
        })
        Patches.inputs.setBoolean("bb", false)
        Patches.inputs.setBoolean("bj1", false)
        Patches.inputs.setBoolean("bj2", false)
        Patches.inputs.setBoolean("bj3", false)
        Patches.inputs.setBoolean("bj4", false)
        Patches.inputs.setBoolean("bj5", true)
    })
})

Patches.outputs.getPulse("playAudio").then(signal => {
    signal.subscribe(event => {
        Audio.getPlaybackController('voice').reset()
        Audio.getPlaybackController('voice').setPlaying(true)
    })
})
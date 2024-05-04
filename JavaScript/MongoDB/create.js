db.inventory.insertMany(
    [
        {item:"Canvas1", qty: 50, tags: ["cotton"], size: {w:28, h: 35.5, uom: "cm"},
        {item:"Canvas2", qty: 200, tags: ["gold"], size: {w:28, h: 35.5, uom: "cm"},
        {item:"Canvas3", qty: 90, tags: ["zinc"], size: {w:28, h: 35.5, uom: "cm"},
        {item:"Canvas4", qty: 70, tags: ["silver"], size: {w:8, h: 35.5, uom: "cm"}
        }
    ]
)
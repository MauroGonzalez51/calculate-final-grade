import { toArray } from "@utils/toArray";
import { useState } from "react";
import { roundToPrecision } from "@utils/roundToPrecision";
import { Input } from "@components/ui/Input";
import { Row } from "@components/Row";
import { Button } from "@components/ui/Button";

function App() {
    const [target, setTarget] = useState({
        targetName: "",
        targetPercentaje: 0,
        targetFinalGrade: 0,
    });

    const [noRows, setNoRows] = useState([window.crypto.randomUUID()]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const { elements } = event.target;

        const names = toArray(elements.namedItem("field-name"));
        const percentajes = toArray(elements.namedItem("percentaje"));
        const currentGrades = toArray(elements.namedItem("current-grade"));

        const data = [];

        names.forEach((_, index) => {
            data.push({
                fieldName: names[index].value,
                percentaje: parseInt(percentajes[index].value) || 0,
                currentGrade: parseFloat(currentGrades[index].value) || 0,
            });
        });

        const targetName = elements.namedItem("target-name");
        const targetPercentaje = elements.namedItem("target-percentaje");

        const sumatory = data.reduce((acc, { percentaje, currentGrade }) => {
            return acc + (percentaje / 100) * currentGrade;
        }, 0);

        setTarget({
            targetName: targetName.value,
            targetPercentaje: targetPercentaje.value,
            targetFinalGrade: roundToPrecision(
                (3 - sumatory) / (targetPercentaje.value / 100),
                1,
            ),
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {noRows.map((rowId) => {
                    return (
                        <Row key={rowId} className="border-black">
                            <Input
                                placeholder="Nombre ..."
                                name="field-name"
                                required
                                autocomplete="off"
                                className="border-blue-800 focus:border-blue-700"
                            />
                            <Input
                                placeholder="Porcentaje ..."
                                name="percentaje"
                                required
                                autocomplete="off"
                                className="border-blue-800 focus:border-blue-700"
                            />
                            <Input
                                placeholder="Nota actual ..."
                                name="current-grade"
                                required
                                autocomplete="off"
                                className="border-blue-800 focus:border-blue-700"
                            />

                            <Button
                                className="border-red-500 bg-red-400 text-white transition-colors hover:bg-red-500"
                                onClick={() => {
                                    const newItems = noRows.filter(
                                        (id) => id !== rowId,
                                    );
                                    setNoRows(newItems);
                                }}
                            >
                                Eliminar Linea
                            </Button>
                            <Button
                                className="border-green-500 bg-green-400 transition-colors hover:bg-green-500"
                                onClick={() => {
                                    setNoRows((prev) => [
                                        ...prev,
                                        window.crypto.randomUUID(),
                                    ]);
                                }}
                            >
                                Agregar Linea
                            </Button>
                        </Row>
                    );
                })}

                <Row className="border-gray-500">
                    <Input
                        placeholder="Parcial"
                        name="target-name"
                        required
                        autocomplete="off"
                        className="border-gray-500 focus:border-gray-800"
                    />
                    <Input
                        placeholder="Porcentaje objetivo"
                        name="target-percentaje"
                        required
                        autocomplete="off"
                        className="border-gray-500 focus:border-gray-800"
                    />
                </Row>

                <Row className="border-blue-400">
                    <Button className="border-blue-600 bg-blue-500 active:bg-blue-600 text-slate-50">
                        Calcular
                    </Button>
                </Row>
            </form>

            <Row className="flex justify-center border-green-600">
                {target.targetFinalGrade}
            </Row>
        </div>
    );
}

export default App;


        window.onload = function() {
            updateEmoji(); 
            showExplanation();
            calculateRange();
        };

        function clearField(field) {
            if (field.value === '0') {
                field.value = '';
            }
        }

        function restoreDefaultValue(field, defaultValue) {
            if (field.value === '') {
                field.value = defaultValue;
            }
        }

        function updateEmoji() {
            const drivingStyle = document.getElementById('drivingStyle').value;
            const emojiDisplay = document.getElementById('emojiDisplay');

            switch (drivingStyle) {
                case '1':
                    emojiDisplay.innerHTML = '🐌 Слишком спокойный';
                    break;
                case '2':
                    emojiDisplay.innerHTML = '🛴 Спокойный';
                    break;
                case '3':
                    emojiDisplay.innerHTML = '🚗 Обычный';
                    break;
                case '4':
                    emojiDisplay.innerHTML = '🔥 Быстрый';
                    break;
                case '5':
                    emojiDisplay.innerHTML = '🚀 Агрессивный';
                    break;
            }
        }

        function showExplanation() {
            const drivingStyle = document.getElementById('drivingStyle').value;
            const explanation = document.getElementById('explanation');

            let explanationText = '';
            switch (drivingStyle) {
                case '1':
                    explanationText = 'Этот стиль подходит для тех, кто ценит абсолютную экономию топлива и долгие, медленные поездки. Максимальная скорость — не выше 60 км/ч. Климата в машине нет, а ты держишь курс на ровную дорогу. Если на пути встречается горка, набирай инерцию: слегка ускорься перед подъемом и плавно заезжай наверх. На спуске круиз-контроль — твой лучший друг. Главное — рассчитывай каждый манёвр заранее, чтобы избежать лишних затрат энергии и сохранить стабильный ход.';
                    break;
                case '2':
                    explanationText = 'Для тех, кто не спешит, но иногда любит немного ускориться. Твой лимит — 80 км/ч. Без климат-контроля, только легкие ускорения, и снова круиз по прямым участкам дороги. Когда горка вниз, сохраняй спокойствие — пусть инерция и круиз сделают всю работу за тебя. В этом режиме ты наслаждаешься спокойной ездой с минимальными затратами энергии.';
                    break;
                case '3':
                    explanationText = 'Ты начинаешь чувствовать свободу за рулем! Можно включить климат-контроль, а максимальная скорость — 100 км/ч. Ускоряйся умеренно, избегай резких маневров, но не стесняйся использовать мощь двигателя, когда это нужно. В этом режиме ты балансируешь между комфортом и эффективностью, находя золотую середину между экономией энергии и динамичной ездой.';
                    break;
                case '4':
                    explanationText = 'Для тех, кто любит скорость и не прочь жертвовать экономией ради драйва! Здесь ты можешь разгоняться до 130 км/ч, активно использовать климат-контроль и смело уходить в ускорения. Быстрые торможения без рекуперации помогут сохранить скорость, но будь осторожен — стиль быстрого вождения потребует больше энергии и топлива. Твой выбор — мощь и динамика!';
                    break;
                case '5':
                    explanationText = 'Максимум скорости, минимум забот! Здесь разрешено почти всё: ускорения до 200 км/ч (На короткое время), быстрые торможения, постоянный климат-контроль — всё это делает твою поездку взрывной! Этот режим требует максимальной отдачи от автомобиля, и тебе предстоит тщательно управлять каждым движением. Но зато ты почувствуешь настоящий адреналин и полную мощь своей машины!';
                    break;
            }

            explanation.textContent = explanationText;
            explanation.classList.add('visible');
        }

		function calculateRange() {
			const batteryCapacityField = document.getElementById('batteryCapacity');
			const fuelTankField = document.getElementById('fuelTank');
			const drivingStyle = document.getElementById('drivingStyle').value;

			const batteryCapacity = validateInput(batteryCapacityField);
			const fuelTank = validateInput(fuelTankField);

			if (batteryCapacity !== null && fuelTank !== null) {
				let styleMultiplier;
				let fuelEfficiency;

				switch (drivingStyle) {
					case '5':
						styleMultiplier = 2;
						fuelEfficiency = 5;
						break;
					case '4':
						styleMultiplier = 4;
						fuelEfficiency = 9;
						break;
					case '3':
						styleMultiplier = 5;
						fuelEfficiency = 12;
						break;
					case '2':
						styleMultiplier = 7;
						fuelEfficiency = 16;
						break;
					case '1':
						styleMultiplier = 10;
						fuelEfficiency = 23;
						break;
					default:
						document.getElementById('result').innerText = 'Пожалуйста, выберите стиль вождения';
						document.getElementById('result').classList.add('visible');
						return;
				}

				const range = Math.ceil((batteryCapacity * styleMultiplier) + (fuelTank * fuelEfficiency));
				document.getElementById('result').innerText = `Ваш запас хода: ${range} км`;
				document.getElementById('result').classList.add('visible');
			} else {
				document.getElementById('result').innerText = 'Пожалуйста, введите корректные данные';
				document.getElementById('result').classList.add('visible');
			}
		}

		function validateInput(field) {
			const value = field.value;
			if (!isNaN(value) && value.trim() !== '') {
				return parseFloat(value);
			} else {
				field.value = '';
				return null;
			}
		}

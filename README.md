# 💰 Financial Coach MVP

Una aplicación web moderna para gestionar tus finanzas personales, establecer metas de ahorro y desbloquear recompensas. Construida con React, TypeScript, Vite y diseño responsive.

## 🎯 Características principales

- **📊 Dashboard inteligente** - Visualiza tu salud financiera con emoticones dinámicos
- **💵 Gestión de ingresos** - Registra y categoriza tus fuentes de ingreso
- **💸 Control de gastos** - Monitorea tus gastos con análisis por categoría
- **🎯 Metas de ahorro** - Crea metas personalizadas con seguimiento visual
- **💳 Control de tarjetas** - Monitorea tu utilización de crédito
- **🏆 Sistema de recompensas** - Desbloquea recompensas al alcanzar metas
- **💾 Almacenamiento local** - Tus datos se guardan automáticamente
- **📱 Diseño responsive** - Funciona en móvil, tablet y desktop

## 🎨 Paleta de colores

La aplicación utiliza una paleta personalizada:

| Color | HEX | Uso |
|-------|-----|-----|
| Verde bosque | #244C3C | Color principal |
| Verde salvia | #A8C5A0 | Ahorros y progreso |
| Crema | #F7F5EF | Fondo general |
| Lavanda | #B9A4DB | Gamificación e insignias |
| Durazno | #E8A66A | Recompensas y destacados |
| Gris oscuro | #303A35 | Textos principales |

## 🚀 Instalación

### Requisitos previos
- Node.js 16+ 
- npm o yarn

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd financial-coach-mvp

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# Visita http://localhost:5173
```

## 📦 Estructura del proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── Dashboard.tsx
│   ├── IncomeSection.tsx
│   ├── ExpensesSection.tsx
│   ├── SavingsSection.tsx
│   ├── CreditCardSection.tsx
│   ├── GoalCard.tsx
│   ├── RewardBadge.tsx
│   ├── TransactionList.tsx
│   ├── CreditCardList.tsx
│   ├── StatBox.tsx
│   └── index.ts
├── hooks/              # Custom hooks
│   └── useFinancial.ts
├── services/           # Lógica de negocio
│   └── financialService.ts
├── types/              # TypeScript interfaces
│   └── index.ts
├── styles/             # Estilos CSS
│   └── index.css
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
```

## 💡 Cómo usar

### 1. Dashboard
Visualiza un resumen de tu situación financiera:
- Emoticón que refleja tu salud financiera
- Porcentaje de salud financiera
- Totales de ingresos, gastos y ahorros
- Transacciones recientes
- Metas de ahorro activas
- Recompensas desbloqueadas

### 2. Ingresos
Registra tus fuentes de ingreso:
- Nuevo ingreso (salario, freelance, inversiones, bonus, otros)
- Visualiza total de ingresos
- Historial de todas tus entradas

### 3. Gastos
Controla tus gastos:
- Nuevo gasto (vivienda, comida, transporte, entretenimiento, salud, compras, otros)
- Análisis por categoría
- Historial detallado de gastos

### 4. Ahorros
Administra tus metas de ahorro:
- Ve el progreso visual de cada meta
- Actualiza el progreso manualmente
- Recibe recompensas automáticamente al alcanzar metas
- Consejos de ahorro personalizados

### 5. Tarjeta de Crédito
Monitorea tu crédito:
- Visualiza utilización por tarjeta
- Análisis de salud de crédito
- Alertas si superas el 70% de utilización
- Recomendaciones para mantener tu crédito saludable

## 🎁 Sistema de recompensas

Al alcanzar el 100% de una meta de ahorro, desbloqueas una recompensa aleatoria:

- ☕ Café especial
- 🎬 Noche de cine
- 🍽️ Cena especial
- 💆 Día de spa
- 🎮 Videojuego nuevo
- 📚 Libro que deseas

## 📊 Indicadores de salud financiera

Los emoticones reflejan tu estado financiero:

- 🤑 **Excelente (80%+)** - Vas excelente, eres muy disciplinado
- 😊 **Bueno (60-79%)** - Vas bien, sigue ahorrando
- 😐 **Moderado (40-59%)** - Revisa tus gastos
- 😟 **Preocupante (20-39%)** - Debes actuar ahora
- 😢 **Crítico (<20%)** - Necesitas mejorar urgentemente

## 🛠️ Comandos disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Compila para producción
npm run preview      # Vista previa de producción

# Linting
npm run lint         # Ejecuta oxlint
```

## 💾 Almacenamiento de datos

La aplicación usa **localStorage** para guardar todos tus datos:
- Las transacciones se guardan automáticamente
- Los cambios se persisten entre sesiones
- No requiere conexión a servidor

**Nota:** Los datos se guardan localmente en tu navegador. Si limpias el caché, perderás los datos.

## 🔧 Tecnologías utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Bundler y servidor de desarrollo
- **CSS3** - Estilos modernos y responsive
- **localStorage API** - Almacenamiento local

## 📱 Compatibilidad

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers modernos

## 📝 Licencia

Este proyecto está bajo licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

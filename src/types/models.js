/**
 * Modelo reutilizavel do participante.
 *
 * @typedef {Object} Participant
 * @property {string} id
 * @property {string} name
 * @property {string} registration
 * @property {boolean} active
 * @property {"active" | "inactive"} status
 * @property {string} updatedAt
 */

/**
 * Modelo reutilizavel da partida.
 *
 * @typedef {Object} Match
 * @property {string} id
 * @property {string} userId
 * @property {string} difficulty
 * @property {string} difficultyId
 * @property {"in_progress" | "completed" | "abandoned"} status
 * @property {string} startedAt
 * @property {string=} finishedAt
 * @property {number=} durationSeconds
 * @property {number[][]} puzzle
 * @property {number[][]} userGrid
 * @property {number[][]} solution
 * @property {boolean[]} fixedCells
 * @property {Record<string, number[]>} candidates
 * @property {MatchEvent[]} events
 */

/**
 * Modelo reutilizavel dos eventos e jogadas.
 *
 * @typedef {Object} MatchEvent
 * @property {string} type
 * @property {string} at
 * @property {number=} cellIndex
 * @property {number=} value
 * @property {boolean=} isCorrect
 * @property {number=} secondsSinceStart
 * @property {number=} secondsSinceLastAction
 */

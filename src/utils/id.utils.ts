let id = 0;
export function getId() {
  if (id > Number.MAX_SAFE_INTEGER) {
    id = 0;
  }

  return id++;
}

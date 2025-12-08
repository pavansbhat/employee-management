import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterTeam: string;
  setFilterTeam: (team: string) => void;
  teams: string[];
}

export const Filter = ({
  searchTerm,
  setSearchTerm,
  filterTeam,
  setFilterTeam,
  teams,
}: FilterProps) => {
  return (
    <div
      style={{
        marginBottom: "1rem",
        position: "sticky",
        top: 0,
        padding: "1rem 0",
        zIndex: 10,
        color: "#333",
      }}
    >
      <label
        htmlFor="search"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <SearchIcon />
        Search Employees
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search by name, designation, or team..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "95%",
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          color: "#000",
          backgroundColor: "#fff",
          marginBottom: "1rem",
        }}
      />

      <label
        htmlFor="filter"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <FilterAltIcon />
        Filter by Team
      </label>
      <select
        id="filter"
        name="filter"
        value={filterTeam}
        onChange={(e) => setFilterTeam(e.target.value)}
        style={{
          width: "100%",
          color: "#000",
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        <option value="all">All Teams</option>
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
    </div>
  );
};

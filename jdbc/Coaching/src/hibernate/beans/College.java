package hibernate.beans;
public class College {
    private int registrationNo;
    private String collegeName;
    private String city;
    private int rank;
    private int totalCourses;
    private String university;

    public College(int registrationNo, String collegeName, String city, int rank, int totalCourses, String university) {
        this.registrationNo = registrationNo;
        this.collegeName = collegeName;
        this.city = city;
        this.rank = rank;
        this.totalCourses = totalCourses;
        this.university = university;
    }

    public int getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(int registrationNo) {
        this.registrationNo = registrationNo;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(int totalCourses) {
        this.totalCourses = totalCourses;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }
    
}
